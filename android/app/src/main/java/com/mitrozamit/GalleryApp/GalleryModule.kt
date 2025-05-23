package com.mitrozamit.GalleryApp

import android.Manifest
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import java.io.File
import android.provider.MediaStore
import android.content.ContentResolver


class GalleryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "GalleryManager"

    @ReactMethod
    fun deleteFile(filePath: String, promise: Promise) {
        try {
            val file = File(filePath)

            if (file.exists()) {
                val context = reactApplicationContext
                val contentResolver = context.contentResolver

                // Build the URI to query MediaStore
                val uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
                val where = MediaStore.Images.Media.DATA + "=?"
                val selectionArgs = arrayOf(file.absolutePath)

                // First, delete from MediaStore (removes from Gallery)
                val rows = contentResolver.delete(uri, where, selectionArgs)

                // Then, delete the actual file (if it still exists)
                if (file.exists()) {
                    file.delete()
                }

                if (rows > 0 || !file.exists()) {
                    promise.resolve("File deleted successfully.")
                } else {
                    promise.reject("DELETE_ERROR", "Could not delete file.")
                }
            } else {
                promise.reject("NOT_FOUND", "File does not exist.")
            }
        } catch (e: Exception) {
            promise.reject("EXCEPTION", "Error deleting file: ${e.localizedMessage}")
        }
    }


    @ReactMethod
    fun requestAllFilesAccess(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && !android.os.Environment.isExternalStorageManager()) {
            val intent = Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
            promise.resolve("Opened settings for permission.")
        } else {
            promise.resolve("Permission already granted.")
        }
    }
}
