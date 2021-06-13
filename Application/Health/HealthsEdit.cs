using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Healths
{
    public class HealthsEdit
    {
        public class Command : IRequest
                {
                    public Guid Id { get; set; }

                    public string Title { get; set; }

                    public string Description { get; set; }

                    public string Category { get; set; }

                    public DateTime? Date { get; set; }

                    public int? Price { get; set; }
        
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
        
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var health = await _context.Healths.FindAsync(request.Id);

                        if(health == null)
                            throw new Exception ("Could not find activity");

                        health.Title = request.Title ?? health.Title;
                        health.Description = request.Description ?? health.Description;
                        health.Category = request.Category ?? health.Category;
                        health.Date = request.Date ?? health.Date;
                        health.Price = request.Price ?? health.Price;


                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}