package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Contact;
import entities.User;

@Transactional
public class ContactDAO {
	@PersistenceContext
	 private EntityManager em;
	
	// LIST ALL CONTACTS
	 public List<Contact> index(){
		String query = "Select c from Contact c";
		  return em.createQuery(query, Contact.class).getResultList();
	}
	 
	// LIST CONTACT BY ID
	public Contact show(int id){
		 return em.find(Contact.class, id);
	}
	
	// CREATE CONTACT
	public Contact create(Contact contact){
		 em.persist(contact);
		 em.flush();
		  
		 return em.find(Contact.class, contact.getId());
	}

	// UPDATE CONTACT
	public void update(int id, Contact contact) {
		  Contact updatedcontact = em.find(Contact.class, id);
		  updatedcontact.setFname(contact.getFname());
		  updatedcontact.setLname(contact.getLname());
		  updatedcontact.setEmail(contact.getEmail());
		  updatedcontact.setLocation(contact.getLocation());
		  updatedcontact.setHours(contact.getHours());
		  em.persist(updatedcontact);
		  em.flush();
		 }	
	
	 // DELETE CONTACT
	 public void destroy(int id) {
	    Contact contact = em.find(Contact.class, id);
	    em.remove(contact);
	  }
	
}
