package com.example.rainbump

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.IBinder

private const val NOTIFICATION_ID = 1

class BackgroundService : Service() {

    override fun onCreate() {
        super.onCreate()
        startForeground(NOTIFICATION_ID, createNotification())
    }
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, createNotification())
        return START_STICKY
    }

    private fun createNotification(): Notification {
        return Notification.Builder(this).setContentTitle("RainBump")
            .setContentText("RainBump is running in the background")
            .setSmallIcon(R.drawable.ic_launcher_foreground).build()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}