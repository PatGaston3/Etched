package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the social_media database table.
 * 
 */
@Entity
@Table(name="social_media")
public class SocialMedia {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="contact_id")
	private int contactId;

	private String type;

	private String username;

//	//bi-directional many-to-one association to Contact
//	@ManyToOne
//	@JsonBackReference(value="contact")
//	private Contact contact;

	public SocialMedia() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public int getContactId() {
		return contactId;
	}
	public void setContactId(int contactId) {
		this.contactId = contactId;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

//	public Contact getContact() {
//		return this.contact;
//	}
//
//	public void setContact(Contact contact) {
//		this.contact = contact;
//	}

	@Override
	public String toString() {
		return "SocialMedia [id=" + id + ", type=" + type + ", username=" + username + "]";
	}


	
	

}