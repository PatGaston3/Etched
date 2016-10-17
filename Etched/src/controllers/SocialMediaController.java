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

import data.SocialMediaDAO;
import entities.SocialMedia;

@RestController
public class SocialMediaController {
	@Autowired
	private SocialMediaDAO socialDAO;
	
	// LIST ALL SOCIAL MEDIA
	@RequestMapping(path = "socialMedia", method = RequestMethod.GET)
	public List<SocialMedia> index() {
		return socialDAO.index();
	}
		
	// LIST SOCIAL MEDIA BY ID
	@RequestMapping(path = "socialMedia/{id}", method = RequestMethod.GET)
	public SocialMedia show(@PathVariable int id) {
		return socialDAO.show(id);
	}
	
	// CREATE SOCIAL MEDIA
	@RequestMapping(path = "socialMedia", method = RequestMethod.POST)
	public void create(@RequestBody String socialJSON, HttpServletResponse res) {
		
		ObjectMapper mapper = new ObjectMapper();

		try {
			SocialMedia social = mapper.readValue(socialJSON, SocialMedia.class);
			socialDAO.create(social);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(500);
		}
	}
	
	// UPDATE SOCIAL MEDIA
	@RequestMapping(path = "socialMedia/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String socialJSON, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		SocialMedia social = null;
		try {
			social = mapper.readValue(socialJSON, SocialMedia.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setStatus(202);
		socialDAO.update(id, social);
	}
	
	// DELETE SOCIAL MEDIA
		@RequestMapping(path = "socialMedia/{id}", method = RequestMethod.DELETE)
		public void destroy(@PathVariable int id, HttpServletResponse response) {
			socialDAO.destroy(id);
			response.setStatus(202);
		}
}
