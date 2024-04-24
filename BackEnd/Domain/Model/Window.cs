namespace Domain.Model;
using System.ComponentModel.DataAnnotations;

public class Window
{
    [Key]
    public int WindowId { get; set; }
    private bool IsOpen { get; set; }
    
    public Window(int windowId, bool isOpen)
        {
            WindowId = windowId;
            IsOpen = isOpen;
        }

    public void changeStatus()
    {
        IsOpen = !IsOpen;
    }

}