using Domain.DTOs;
using Domain.Model;

namespace Application.DAOInterfaces;

public interface IGreenHouseDAO
{
    public Task<IEnumerable<GreenHouse>> GetAsync(SearchGreenHouseDTO searchParameters);
    Task<GreenHouse> CreateAsync(GreenHouse greenHouse);
    Task<GreenHouse?> GetByNameAsync(string userName);
    Task UpdateAsync(GreenHouse greenHouse);
    Task<GreenHouse> GetByIdAsync(int id);

}