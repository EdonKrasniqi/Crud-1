using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Sports
{
    public class SportsEdit
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
                        var sport = await _context.Sports.FindAsync(request.Id);

                        if(sport == null)
                            throw new Exception ("Could not find activity");

                        sport.Title = request.Title ?? sport.Title;
                        sport.Description = request.Description ?? sport.Description;
                        sport.Category = request.Category ?? sport.Category;
                        sport.Date = request.Date ?? sport.Date;
                        sport.Price = request.Price ?? sport.Price;


                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}