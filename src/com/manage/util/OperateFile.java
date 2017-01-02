package com.manage.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collections;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 操作字符串工具类
 */
public class OperateFile {
	
	// 获得某个目录下的文件总个数
	public static int getFileCount(String filePath) throws FileNotFoundException, IOException {
		int count = 0;
		try {
                        File file = new File(filePath);
                        if (file.isDirectory()) {
                                String[] filelist = file.list();
                                for (int i = 0; i < filelist.length; i++) {
                                        File readfile = new File(filePath + System.getProperty("file.separator") + filelist[i]);
                                        if (!readfile.isDirectory()) {
                                                count++;
                                        } else if (readfile.isDirectory()) {
                                        		getFileCount(filePath + System.getProperty("file.separator") + filelist[i]);
                                        }
                                }
                        }
                } catch (FileNotFoundException e) {
                        System.out.println("readfile()   Exception:" + e.getMessage());
                }
		
		return count;
	}
	
	// 获得某个目录下所有文件
	public static JSONArray getAllFiles(String filePath) throws FileNotFoundException, IOException {
		JSONArray backupJsonArray = new JSONArray();
		
                try {
                        File file = new File(filePath);
                        if (file.isDirectory()) {
                                String[] filelist = file.list();
                                for (int i = 0; i < filelist.length; i++) {
                                        File readfile = new File(filePath + System.getProperty("file.separator") + filelist[i]);
                                        if (!readfile.isDirectory()) {
                                        		String fileName = readfile.getName().substring(readfile.getName().lastIndexOf(System.getProperty("file.separator"))+1);
                                                int fileSize = getSize(filePath + System.getProperty("file.separator")  + fileName);
                                                JSONObject backupJson = new JSONObject();
                                                backupJson.put("Backup_Name", fileName);
                                                backupJson.put("Backup_Size", fileSize);
                                                backupJsonArray.add(backupJson);
                                        } else if (readfile.isDirectory()) {
                                        		getAllFiles(filePath + System.getProperty("file.separator") + filelist[i]);
                                        }
                                }
                        }
                } catch (FileNotFoundException e) {
                        System.out.println("readfile()   Exception:" + e.getMessage());
                }
                
                // 倒序
                Collections.reverse(backupJsonArray);
                return backupJsonArray;
        }
	
	// 获得文件的大小
	public static int getSize(String filePath) throws FileNotFoundException, IOException {
                File file = new File(filePath);
                if (file.exists() && file.isFile()){  
                    return (int) file.length();
                }else{  
                    System.out.println("文件不存在或不是一个文件");
                }  
                return 0;
        }
	
}
