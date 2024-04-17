using System.Text.Json;
using Domain.Model;
using Services.ServiceInterfaces;

namespace Services.Implementation;

public class WindowService : IWindowService
{
    private readonly HttpClient client;

    public WindowService(HttpClient client)
    {
        this.client = client;
    }

    public async Task<Window> GetWindowByIdAsync(int windowId)
    {
        HttpResponseMessage response = await client.GetAsync($"/{windowId}");
        string content = await response.Content.ReadAsStringAsync();
        
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception(content);
        }
        Window window = JsonSerializer.Deserialize<Window>(content,new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        })!;

        return window;
    }
}