using Domain.Model;

namespace FileData;

public class DataContainer
{
    public ICollection<GreenHouse> GreenHouses { get; set; }
    public ICollection<Window> Windows { get; set; }
}