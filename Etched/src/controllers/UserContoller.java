package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.UserDAO;
import entities.User;

@RestController
public class UserContoller {
	@Autowired
	private UserDAO userDAO;
	 
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "PoNg!!!!!!!";
	}

	// LIST ALL USERS
	@RequestMapping(path = "users", method = RequestMethod.GET)
	public List<User> index() {
		return userDAO.index();
	}
	
	// LIST USER BY ID
	@RequestMapping(path = "users/{id}", method = RequestMethod.GET)
	public User show(@PathVariable int id) {
		return userDAO.show(id);
	}
	
	// CREATE USER
		@RequestMapping(path = "users", method = RequestMethod.POST)
		public void create(@RequestBody String userJSON, HttpServletResponse res) {
			System.out.println(userJSON);
			
			ObjectMapper mapper = new ObjectMapper();

			try {
				User user = mapper.readValue(userJSON, User.class);
				userDAO.create(user);
				res.setStatus(201);
			} catch (Exception e) {
				e.printStackTrace();
				res.setStatus(500);
			}
		}
		
		
	// UPDATE USER
	@RequestMapping(path = "users/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String usersJSON, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		try {
			user = mapper.readValue(usersJSON, User.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setStatus(202);
		userDAO.update(id, user);
	}
	
	
	// DELETE USER
		@RequestMapping(path = "users/{id}", method = RequestMethod.DELETE)
		public void destroy(@PathVariable int id, HttpServletResponse response) {
			userDAO.destroy(id);
			response.setStatus(202);
		}
	
}

