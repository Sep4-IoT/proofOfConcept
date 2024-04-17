using Application.DAOInterfaces;
using Domain.DTOs;
using Domain.Model;

namespace FileData.DAOs;

public class GreenHouseFileDAO : IGreenHouseDAO
{
    private readonly FileContext context;
    
    public GreenHouseFileDAO(FileContext context)
    {
        this.context = context;
    }
    
    public Task<IEnumerable<GreenHouse>> GetAsync(SearchGreenHouseDTO searchParameters)
    {
        IEnumerable<GreenHouse> greenHouses = context.GreenHouses.AsEnumerable();
        if (searchParameters.GreenHouseID != null)
        {
           greenHouses = context.GreenHouses.Where(u => u.GreenHouseId == searchParameters.GreenHouseID);
        }

        return Task.FromResult(greenHouses);
    }
}