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
import data.Task;

@Path("/taskservice")
public class TaskService {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getalltask")
	public ArrayList<Task> getAllUser() {
		String sql = "select * from tasks";
		ResultSet RS = null;
		ArrayList<Task> task = new ArrayList<>();
		Connection conn = null;

		try {
			if (SystemProperty.environment.value() == SystemProperty.environment.value().Production) {
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
				Task t = new Task();
				t.setId(RS.getInt("id"));
				t.setTask(RS.getString("task"));
				t.setUserId(RS.getInt("userid"));
				t.setStartDate(RS.getString("startdate"));
				t.setEndDate(RS.getString("enddate"));
				task.add(t);
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
		return task;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
	@Consumes(MediaType.APPLICATION_JSON)//Method receives object as a JSON string
	@Path("/addtask")
	public Task receiveJsonTask(Task t) {
		String sql="insert into tasks(task,userid,startdate,enddate) values(?,?,?,?)";
		
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
			pstmt.setString(1, t.getTask());
			pstmt.setInt(2, t.getUserId());
			pstmt.setDate(3, java.sql.Date.valueOf(t.getStartDate()));
			pstmt.setDate(4, java.sql.Date.valueOf(t.getEndDate()));
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
		
		return t;
	}
	@DELETE
	@Path("/deletetask/{p1}")
	public void deleteUser(@PathParam("p1") int id) {
		System.out.println(id);
		String sql="delete from tasks where userid=?";
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


