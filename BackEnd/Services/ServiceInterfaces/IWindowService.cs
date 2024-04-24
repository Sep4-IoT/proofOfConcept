using Domain.Model;

namespace Services.ServiceInterfaces;

public interface IWindowService
{
    Task<Window> GetWindowByIdAsync(int windowId);
}