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

    public class DummyData
    {
        private List<Window> windows;

        public DummyData()
        {
            // Initialize dummy data
            windows = new List<Window>
            {
                new Window(1, true),
                new Window(2, false),
                new Window(3, true),
                // Add more windows as needed
            };
        }

    }
}