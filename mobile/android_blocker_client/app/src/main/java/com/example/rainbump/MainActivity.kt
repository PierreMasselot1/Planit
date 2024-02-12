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
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getSystemService
import com.example.rainbump.ui.theme.RainBumpTheme
import java.util.Calendar

class MainActivity : ComponentActivity() {

    private val REQUEST_CODE_USAGE_STATS = 1

    override fun onCreate(savedInstanceState: Bundle?) {
// Start background service
        val serviceIntent = Intent(this, BackgroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)

        super.onCreate(savedInstanceState)
        MainView()
    }

    override fun onResume() {
        // Start background service
        val serviceIntent = Intent(this, BackgroundService::class.java)
        ContextCompat.startForegroundService(this, serviceIntent)

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