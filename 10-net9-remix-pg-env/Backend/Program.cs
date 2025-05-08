using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the database context.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Aplicar migraciones automáticamente - AÑADIR ESTE BLOQUE
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
        // Opcionalmente puedes agregar datos iniciales si la tabla está vacía
        if (!context.Products.Any())
        {
            context.Products.Add(new Backend.Models.Product { Name = "Producto inicial", Price = 19.99m });
            context.SaveChanges();
        }
        Console.WriteLine("Migraciones aplicadas correctamente");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al aplicar migraciones: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // Optional: Serve Swagger UI at the app's root.
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();