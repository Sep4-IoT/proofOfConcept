namespace Domain.DTOs;

public class GreenHouseCreationDTO
{
    public string GreenHouseName {get;}
    
    public GreenHouseCreationDTO(string greenHouseName)
        {
            GreenHouseName = greenHouseName;
        }
    
    
}