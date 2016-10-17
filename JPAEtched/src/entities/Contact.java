package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


/**
 * The persistent class for the contact database table.
 * 
 */
@Entity
public class Contact{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="user_id")
	private int userId;
	
	private String email;

	private String fname;

	private String lname;

	private String location;
	
	private int hours;
	
//
//	//bi-directional many-to-one association to User
//	@ManyToOne
//	@JsonBackReference
//	private User user;

//	//bi-directional many-to-one association to SocialMedia
//	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
//	@JsonManagedReference(value="contact")
//	private List<SocialMedia> socialMedias;

	public Contact() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFname() {
		return this.fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return this.lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

//	public User getUser() {
//		return this.user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//
//	public List<SocialMedia> getSocialMedias() {
//		return this.socialMedias;
//	}
//
//	public void setSocialMedias(List<SocialMedia> socialMedias) {
//		this.socialMedias = socialMedias;
//	}
//
//	public SocialMedia addSocialMedia(SocialMedia socialMedia) {
//		getSocialMedias().add(socialMedia);
//		socialMedia.setContact(this);
//
//		return socialMedia;
//	}
//
//	public SocialMedia removeSocialMedia(SocialMedia socialMedia) {
//		getSocialMedias().remove(socialMedia);
//		socialMedia.setContact(null);
//
//		return socialMedia;
//	}
	
	public int getUserId() {
		return userId;
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getHours() {
		return hours;
	}
	
	public void setHours(int hours) {
		this.hours = hours;
	}
	
	@Override
	public String toString() {
		return "Contact [id=" + id + ", email=" + email + ", fname=" + fname + ", lname=" + lname + ", location="
				+ location + "]";
	}



	

}