package data;

public class User {
	int id;
	String username;
	int points;
	String filename;
	
	public String getFilename() {
		return filename;
	}
	public void setFilename(String imagesource) {
		this.filename = imagesource;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	
}
