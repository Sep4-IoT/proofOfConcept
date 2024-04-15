using Application.LogicInterfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class WindowController : ControllerBase
{
    private readonly IWindowLogic WindowLogic;

    public WindowController(IWindowLogic windowLogic)
    {
        WindowLogic = windowLogic;
    }


    [HttpGet ("{windowId}")]
    public async Task<ActionResult<Window>> GetWindowByIdAsync(int windowId)
    {
        try
        {
            var window = await WindowLogic.GetWindowByIdAsync(windowId);  
            return window;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, e.Message);
        }
    }
}