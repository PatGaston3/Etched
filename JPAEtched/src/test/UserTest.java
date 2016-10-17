package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.User;

public class UserTest {
	
	private EntityManagerFactory emf;
    private EntityManager em;


	@Before
	public void setUp() throws Exception {
		emf = Persistence.
	            createEntityManagerFactory("JPAEtched");
	        em = emf.createEntityManager();
	}

	@Test
	public void test() {
		  User user = em.find(User.class, 1);
	      System.out.println(user);
	      assertEquals("pgaston", user.getUsername());
	      assertEquals("pgaston", user.getPassword());

	}

	@After
	public void tearDown() throws Exception {
		em.close();
        emf.close();
	}
}
