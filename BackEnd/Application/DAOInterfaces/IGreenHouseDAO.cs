using Domain.DTOs;
using Domain.Model;

namespace Application.DAOInterfaces;

public interface IGreenHouseDAO
{
    public Task<IEnumerable<GreenHouse>> GetAsync(SearchGreenHouseDTO searchParameters);
}