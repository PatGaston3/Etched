package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String email;

	private String fname;

	private String lname;

	private String password;

	private String phone;

	private String username;

//	//bi-directional many-to-one association to Contact
//	@OneToMany(mappedBy="user", fetch=FetchType.EAGER)
//	@JsonManagedReference
//	private List<Contact> contacts;

	public User() {
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

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

//	public List<Contact> getContacts() {
//		return this.contacts;
//	}
//
//	public void setContacts(List<Contact> contacts) {
//		this.contacts = contacts;
//	}

//	public Contact addContact(Contact contact) {
//		getContacts().add(contact);
//		contact.setUser(this);
//
//		return contact;
//	}
//
//	public Contact removeContact(Contact contact) {
//		getContacts().remove(contact);
//		contact.setUser(null);
//
//		return contact;
//	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", fname=" + fname + ", lname=" + lname + ", password="
				+ password + ", phone=" + phone + ", username=" + username + "]";
	}
	
	

}