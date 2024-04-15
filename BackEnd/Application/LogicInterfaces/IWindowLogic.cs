using Domain.Model;

namespace Application.LogicInterfaces;

public interface IWindowLogic
{
    Task<Domain.Model.Window> GetWindowByIdAsync(int windowId);
}