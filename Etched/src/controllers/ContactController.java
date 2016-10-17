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

import data.ContactDAO;
import entities.Contact;
import entities.User;

@RestController
public class ContactController {
	@Autowired
	private ContactDAO contactDAO;
	
	// LIST ALL CONTACTS
	@RequestMapping(path = "contacts", method = RequestMethod.GET)
	public List<Contact> index() {
		return contactDAO.index();
	}
	
	// LIST CONTACT BY ID
	@RequestMapping(path = "contacts/{id}", method = RequestMethod.GET)
	public Contact show(@PathVariable int id) {
		return contactDAO.show(id);
	}
	
	// CREATE CONTACT
	@RequestMapping(path = "contacts", method = RequestMethod.POST)
	public void create(@RequestBody String contactJSON, HttpServletResponse res) {
			
		ObjectMapper mapper = new ObjectMapper();
		try {
			Contact contact = mapper.readValue(contactJSON, Contact.class);
			contactDAO.create(contact);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(500);
		}
	}
	
	// UPDATE CONTACT
	@RequestMapping(path = "contacts/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String contactJSON, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		Contact contact = null;
		try {
			contact = mapper.readValue(contactJSON, Contact.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setStatus(202);
		contactDAO.update(id, contact);
	}
	
	// DELETE CONTACT
	@RequestMapping(path = "contacts/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id, HttpServletResponse response) {
		contactDAO.destroy(id);
		response.setStatus(202);
	}
	
}
