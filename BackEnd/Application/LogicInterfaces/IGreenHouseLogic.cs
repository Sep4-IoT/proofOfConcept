using Domain.DTOs;
using Domain.Model;

namespace Application.LogicInterfaces;

public interface IGreenHouseLogic
{
    public Task<IEnumerable<GreenHouse>> GetAsync(SearchGreenHouseDTO searchParameters);
    
    
}