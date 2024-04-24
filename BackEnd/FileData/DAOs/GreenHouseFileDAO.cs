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

    public Task<GreenHouse> CreateAsync(GreenHouse greenHouse)
    {
        int greenHouseId = 1;
        if (context.GreenHouses.Any())
        {
            greenHouseId = context.GreenHouses.Max(g => g.GreenHouseId);
            greenHouseId++;
        }

        greenHouse.GreenHouseId = greenHouseId;

        context.GreenHouses.Add(greenHouse);
        context.SaveChanges();

        return Task.FromResult(greenHouse);
    }

    public Task<GreenHouse?> GetByNameAsync(string name)
    {
       GreenHouse? existing = context.GreenHouses.FirstOrDefault(u =>
            u.GreenHouseName.Equals(name, StringComparison.OrdinalIgnoreCase)
        );
        return Task.FromResult(existing);
    }
}