using Application.LogicInterfaces;
using Domain.Model;

namespace Application.Logic;

public class WindowLogic : IWindowLogic
{
    private readonly List<Window> windows;

    public WindowLogic(List<Window> dummyData)
    {
        windows = dummyData;
    }

    public async Task<Window> GetWindowByIdAsync(int windowId)
    {
        await Task.Delay(100);
        
        return windows.FirstOrDefault(w => w.WindowId == windowId);
    }
}
