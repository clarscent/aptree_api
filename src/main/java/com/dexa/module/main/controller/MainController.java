package com.dexa.module.main.controller;

import com.dexa.frame.util.Constants;
import com.dexa.module.base.BaseController;
import com.dexa.module.main.service.MainService;
import com.dexa.module.main.vo.ProgramVO;
import com.dexa.module.main.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
public class MainController extends BaseController {

	@Autowired
	private MainService mainService;

	public MainController() {
		super();
	}


	@RequestMapping("/loginPage.do")
	public ModelAndView loginPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("requestURL:" + context.getRequestURL());

		ModelAndView view = new ModelAndView("/main/loginPage");
		//loginUserInfo = null;

		return view;
	}

	@RequestMapping(value = "/loginProcess", method = RequestMethod.POST)
	public UserVO loginProcess(@RequestBody UserVO user) throws Exception {
		log.info("requestURL:" + context.getRequestURL());

		String returnURL = "/main/mainPage";

		try {
			System.out.println(user);

			user = mainService.selectLoginUser(user);

			if (user == null) {
				user = new UserVO(false);
			} else {
				user.USR_OK = true;
				HttpSession session = context.getSession();

				user.LOGIN_USR_ID = user.USR_ID;
				user.USR_IP = context.getRemoteAddr();

				session.setAttribute("loginInfo", user);

				log.info("LOGIN USER", user);

				session.setMaxInactiveInterval(60 * 30); // 세션 타임아웃 30분
			}

		} catch (Exception e) {
			user = new UserVO(false);
			log.error(Constants.ERROR_SQL, e);
		}

		return user;
	}

	@RequestMapping("/mainPage.do")
	public ModelAndView mainPage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView view = new ModelAndView("/main/mainPage");

		List<ProgramVO> programList = null;

		try {
			programList = mainService.selectMenuList("TEST");
			request.setAttribute("menuList", programList);
		} catch (BadSqlGrammarException e) {
			log.error(Constants.ERROR_SQL, e);
			programList = new ArrayList<>();
		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
			programList = new ArrayList<>();
		}

		return view;
	}


	@RequestMapping("/get/user/{id}/{pw}")
	public UserVO mainPage(@PathVariable String id, @PathVariable String pw) {
		UserVO vo = new UserVO();
		vo.USR_ID = id;
		vo.USR_PW = pw;
		UserVO loginedVo = mainService.selectLoginUser(vo);
		return loginedVo;
	}

	@RequestMapping(value = "/menulist", method = RequestMethod.GET)
	public List<ProgramVO> menuList(@RequestParam String programId) {
		log.info("requestURL:" + context.getRequestURL());

		List<ProgramVO> list = null;

		try {
			list = mainService.selectMenuList(programId);
		} catch (BadSqlGrammarException e) {
			log.error(Constants.ERROR_SQL, e);
			list = new ArrayList<>();
		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
			list = new ArrayList<>();
		}

		return list;
	}

	@RequestMapping("/logout.do")
	public ModelAndView logout() {
		log.info("requestURL:" + context.getRequestURL());

		ModelAndView view = new ModelAndView("/main/loginPage");

		try {
			HttpSession session = context.getSession();
			session.invalidate();
			//loginUserInfo = null;
		} catch (NullPointerException e) {
			log.error(Constants.ERROR_CON, e);
		} catch (Exception e) {
			log.error(Constants.ERROR_CON, e);
		}

		return view;
	}


}