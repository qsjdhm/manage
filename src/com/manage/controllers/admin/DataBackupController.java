package com.manage.controllers.admin;

import java.io.File;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.manage.util.ENV;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.manage.service.IArticleService;
import com.manage.service.IBookService;
import com.manage.service.ICommentService;
import com.manage.service.ILinkService;
import com.manage.service.ISortService;
import com.manage.util.GenerateHtml;
import com.manage.util.HtmlRegexp;
import com.manage.util.OperateImage;
import com.manage.util.OperateString;
import com.manage.util.OperateFile;
import com.manage.vo.TArticle;
import com.manage.vo.TBook;
import com.manage.vo.TLink;
import com.manage.vo.TSort;
import com.manage.vo.TComment;


@Controller
@RequestMapping(value = "/backupAction")
public class DataBackupController {
	
	 
	@RequestMapping(value = "/getBackupList")
	public void getBackupList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
//		int page = Integer.parseInt(request.getParameter("page"));
//		int size = Integer.parseInt(request.getParameter("size"));
		
		OperateFile operateFile = new OperateFile();
		
		String classPath = this.getClass().getResource("/").getPath();
	        
	        String webContentPath = classPath.split("WEB-INF")[0];
	        JSONArray backupJsonArray = operateFile.getAllFiles(webContentPath + "backupFile");
	        int count = backupJsonArray.size();
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取备份列表成功");
		jsonObject.put("data", backupJsonArray);
		jsonObject.put("count", count);
		
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
//	@RequestMapping(value = "/getArticleList")
//	public void getArticleList(HttpServletRequest request, HttpServletResponse response) throws Exception{
//		
//		int sort = Integer.parseInt(request.getParameter("sort"));
//		int page = Integer.parseInt(request.getParameter("page"));
//		int size = Integer.parseInt(request.getParameter("size"));
//		List <TArticle> articles = articleService.getArticle(sort, page, size);
//		
//		JSONArray articleJsonArray = new JSONArray();
//		for(int i=0; i<articles.size(); i++){
//			JSONObject articleJson = new JSONObject();
//			TArticle article = articles.get(i);
//			
//			String contentHtml = article.getArticle_Content();
//			String content = "";
//			// 过滤图片
//			OperateImage operateImage = new OperateImage();
//			OperateString operateString = new OperateString();
//			contentHtml = operateImage.filterImage(contentHtml);
//			// 过滤html所有标签
//			contentHtml = operateString.filterHtmlTag(contentHtml);
//			// 截取字符串
//			contentHtml = operateString.interceptCharacters(contentHtml, 0, 150);
//			content = contentHtml.replaceAll("&nbsp;", "");  
//
//			articleJson.put("Article_ID", article.getArticle_ID());
//			articleJson.put("Article_Title", article.getArticle_Title());
//			articleJson.put("Article_Tag", article.getArticle_Tag());
//			articleJson.put("Article_Content", content);
//			articleJson.put("Sort_Name", article.getSort_Name());
//			articleJson.put("Recommend_Num", article.getRecommend_Num());
//			articleJson.put("Read_Num", article.getRead_Num());
//			articleJson.put("Article_Date", article.getArticle_Date());
//			
//			articleJsonArray.add(articleJson);
//		}
//		
//		// 3.返回添加状态信息
//		JSONObject jsonObject = new JSONObject();
//		jsonObject.put("success", "1");
//		jsonObject.put("msg", "获取文章列表成功");
//		jsonObject.put("data", articleJsonArray);
//		
//		response.setContentType("text/html;charset=utf-8");
//		response.setHeader("Cache-Control", "no-cache"); 
//		response.setCharacterEncoding("UTF-8");
//		response.getWriter().print(jsonObject); 
//	}
	
	
}