package rest;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.appengine.api.utils.SystemProperty;

import conn.Connections;
import data.User;

@Path("/userservice")
public class UserService {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getAll")
	public ArrayList<User> getAllUser() {
		String sql = "select * from users";
		ResultSet RS = null;
		ArrayList<User> user = new ArrayList<>();
		Connection conn = null;
		try {
		    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
		    	conn = Connections.getProductionConnection();
		    } else {
				conn = Connections.getDevConnection();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Statement stmt;
		try {
			stmt = conn.createStatement();
			RS = stmt.executeQuery(sql);
			while (RS.next()) {
				User u = new User();
				u.setId(RS.getInt("userid"));
				u.setUsername(RS.getString("username"));
				u.setPoints(RS.getInt("points"));
				u.setFilename(RS.getString("filename"));
				user.add(u);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
//		e.printStackTrace();
			}
		}
		return user;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
	@Consumes(MediaType.APPLICATION_JSON)//Method receives object as a JSON string
	@Path("/adduser")
	public User receiveJsonPerson(User u) {
		String sql="insert into users(username,filename) values(?,?)";
		
		Connection conn=null;
		try {
		    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
		    	conn = Connections.getProductionConnection();
		    }
		    else {
		    	conn = Connections.getDevConnection();
		    }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PreparedStatement pstmt;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, u.getUsername());
			pstmt.setString(2, u.getFilename());
			pstmt.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (conn!=null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
//				e.printStackTrace();
			}
		}
		
		//fish.setBreed(fish.getBreed()+" modified");
		return u;
	}
	@DELETE
	@Path("/deleteuser/{p1}")
	public void deleteUser(@PathParam("p1") int id) {
		System.out.println(id);
		String sql="delete from users, tasks using users inner join tasks where users.userid = ? and users.userid = tasks.userid;";
		Connection conn=null;
		try {
		    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
		    	conn = Connections.getProductionConnection();
		    }
		    else {
		    	conn = Connections.getDevConnection();
		    }
		} catch (Exception e) {
		}
		PreparedStatement pstmt;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, id);
			pstmt.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (conn!=null) {
			try {
				conn.close();
			} catch (SQLException e) {
			}
		}
		
	}
}


