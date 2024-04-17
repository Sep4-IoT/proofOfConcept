namespace Domain.Model;

public class Window
{
    public int WindowId { get; set; }
    private bool IsOpen { get; set; }
    
    public Window(int windowId, bool isOpen)
        {
            WindowId = windowId;
            IsOpen = isOpen;
        }
    
}