package com.example.rainbump

import android.app.ActivityManager
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.annotation.RequiresApi
import android.os.Handler
import android.os.Looper

private const val NOTIFICATION_ID = 1
private const val CHANNEL_ID = "ForegroundServiceChannel"

class BackgroundService : Service() {
    private val handler = Handler(Looper.getMainLooper())
    private var runnableCode = object : Runnable {
        override fun run() {
            Log.d("BackgroundService", "RainBump is running in the background")
            // Log currently opened app
            val currentApp = getForegroundApp()
            Log.d("BackgroundService", "Current app: $currentApp")
            handler.postDelayed(this, 1000)
        }
    }

    private fun getForegroundApp(): String? {
        // Get current foreground app using the UsageStatsManager
        val am = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val foregroundTaskInfo = am.getRunningTasks(1)
        val foregroundTaskPackageName = foregroundTaskInfo[0].topActivity?.packageName
        val packageManager = applicationContext.packageManager
        val ai: ApplicationInfo? = try {
            packageManager.getApplicationInfo(foregroundTaskPackageName!!, 0)
        } catch (e: Exception) {
            null
        }
        return if (ai != null) {
            packageManager.getApplicationLabel(ai).toString()
        } else {
            null
        }

    }

    override fun onCreate() {
        super.onCreate()
        startForeground(NOTIFICATION_ID, createNotification())
        handler.post(runnableCode)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, createNotification())
        // Log that app started in foreground
        Log.d("BackgroundService", "App started in foreground")
        return START_STICKY
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID, "Foreground Service Channel", NotificationManager.IMPORTANCE_DEFAULT
            )

            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(serviceChannel)
        }
    }

    private fun createNotification(): Notification {
        createNotificationChannel()

        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID).setContentTitle("RainBump")
                .setContentText("RainBump is running in the background")
                .setSmallIcon(R.drawable.ic_launcher_foreground).build()
        } else {
            Notification.Builder(this).setContentTitle("RainBump")
                .setContentText("RainBump is running in the background")
                .setSmallIcon(R.drawable.ic_launcher_foreground).build()
        }
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(runnableCode)
    }
}
