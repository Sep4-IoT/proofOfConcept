namespace Domain.Model;

public class GreenHouse
{
    public int GreenHouseId { get; set; }
    public string GreenHouseName { get; set; }
    public string? Description { get; set; }
    public double Temperature { get; set; }
    public double LightIntensity { get; set; }
    public double Co2Levels { get; set; }
    public double Humidity { get; set; }
    public Window Window { get; }
    
    
    
}