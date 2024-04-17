using Application.DAOInterfaces;
using Application.LogicInterfaces;
using Domain.DTOs;
using Domain.Model;

namespace Application.Logic;

public class GreenHouseLogic : IGreenHouseLogic
{
    private readonly IGreenHouseDAO GreenHouserDao;

    public GreenHouseLogic(IGreenHouseDAO greenHouseDao)
    {
        GreenHouserDao = greenHouseDao;
    }
    
    public Task<IEnumerable<GreenHouse>> GetAsync(SearchGreenHouseDTO searchParameters)
    {
        return GreenHouserDao.GetAsync(searchParameters);
    }
}