package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.SocialMedia;

@Transactional
public class SocialMediaDAO {
	@PersistenceContext
	 private EntityManager em;
	
	// LIST ALL SOCIAL MEDIA
	public List<SocialMedia> index(){
		String query = "Select sm from SocialMedia sm";
		return em.createQuery(query, SocialMedia.class).getResultList();
	}
	
	 // LIST USER BY ID
	 public SocialMedia show(int id){
		return em.find(SocialMedia.class, id);
	}
	 
	 // CREATE SOCIAL MEDIA
	 public SocialMedia create(SocialMedia social){
		  em.persist(social);
		  em.flush();
		  
		 return em.find(SocialMedia.class, social.getId());
	}
	 
	 // UPDATE SOCIAL MEDIA
	 public void update(int id, SocialMedia social) {
	       SocialMedia updatedmedia = em.find(SocialMedia.class, id);
	       updatedmedia.setContactId(social.getContactId());
	       updatedmedia.setType(social.getType());
	       updatedmedia.setUsername(social.getUsername());
	       em.persist(updatedmedia);
	       em.flush();
	 }
	 
	 // DELETE SOCIAL MEDIA
	 public void destroy(int id) {
	    SocialMedia social = em.find(SocialMedia.class, id);
	    em.remove(social);
	  }	 

}
