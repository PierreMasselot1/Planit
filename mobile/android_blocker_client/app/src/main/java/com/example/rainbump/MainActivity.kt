package com.example.rainbump

import android.app.AppOpsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.core.content.ContextCompat.getSystemService
import com.example.rainbump.ui.theme.RainBumpTheme
import java.util.Calendar

class MainActivity : ComponentActivity() {

    private val REQUEST_CODE_USAGE_STATS = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MainView()
    }

    override fun onResume() {
        super.onResume()
        MainView()
    }

    private fun MainView() {
        //Check for permission
        checkAndRequestUsageStatsPermission()
        setContent {
            RainBumpTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Android")
                }
            }
        }
        while (true) {
            Thread.sleep(2000)
            getLastOpenedApps(this)

        }
    }

    private fun checkAndRequestUsageStatsPermission(): Boolean {
        if (!hasUsageStatsPermission()) {
            Log.d("RainBump", "Requesting Usage Stats permission")
            requestUsageStatsPermission()
        }
        return hasUsageStatsPermission()
    }

    private fun hasUsageStatsPermission(): Boolean {
        val appOps = getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = appOps.checkOpNoThrow(
            AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), packageName
        )
        return mode == AppOpsManager.MODE_ALLOWED
    }

    private fun requestUsageStatsPermission() {
        requestPermissions(
            arrayOf("android.permission.PACKAGE_USAGE_STATS"), REQUEST_CODE_USAGE_STATS
        )
        // Direct the user to the Usage Stats settings page
        startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))

    }
}

data class AppInfo(
    val name: String,
    val packageName: String,
    val lastTimeUsed: Long,
)

fun getLastOpenedApps(context: Context): List<String> {
    val cal = Calendar.getInstance()
    cal.add(Calendar.DAY_OF_YEAR, -1)
    val queryUsageStats = getSystemService(context, UsageStatsManager::class.java)?.queryUsageStats(
        UsageStatsManager.INTERVAL_DAILY, cal.timeInMillis, System.currentTimeMillis()
    )

// Create a list of AppInfo objects from queryUsageStats
    val appInfoList = mutableListOf<AppInfo>()

// Get package manager
    val packageManager = context.packageManager

// Iterate through queryUsageStats
    queryUsageStats?.forEach { usageStats ->
        // Check if the app is a system app
        if (!isSystemApp(packageManager, usageStats.packageName)) {
            // Get application info
            val applicationInfo: ApplicationInfo? = try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    packageManager.getApplicationInfo(
                        usageStats.packageName, PackageManager.ApplicationInfoFlags.of(
                            0
                        )
                    )
                } else {
                    TODO("VERSION.SDK_INT < TIRAMISU")
                }
            } catch (e: PackageManager.NameNotFoundException) {
                null
            }

            // Get application name
            if (applicationInfo == null) {
                Log.w("RainBump", "ApplicationInfo is null")
                return@forEach
            }

            val applicationName = packageManager.getApplicationLabel(applicationInfo).toString()

            // Add AppInfo object to appInfoList
            appInfoList.add(
                AppInfo(
                    name = applicationName,
                    packageName = usageStats.packageName,
                    lastTimeUsed = usageStats.lastTimeUsed
                )
            )
        }
    }


    if (queryUsageStats != null) {
        return queryUsageStats.map { it.packageName }
    } else {
        return emptyList()

    }
}

private fun isSystemApp(packageManager: PackageManager, packageName: String): Boolean {
    return try {
        val packageInfo = packageManager.getPackageInfo(packageName, 0)
        packageInfo.applicationInfo.flags and ApplicationInfo.FLAG_SYSTEM != 0
    } catch (e: PackageManager.NameNotFoundException) {
        false
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!", modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    RainBumpTheme {
        Greeting("Android")
        Text(text = "Hello World!")
    }
}