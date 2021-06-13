using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Clothings
{
    public class ClothingsEdit
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
                        var clothing = await _context.Clothings.FindAsync(request.Id);

                        if(clothing == null)
                            throw new Exception ("Could not find activity");

                        clothing.Title = request.Title ?? clothing.Title;
                        clothing.Description = request.Description ?? clothing.Description;
                        clothing.Category = request.Category ?? clothing.Category;
                        clothing.Date = request.Date ?? clothing.Date;
                        clothing.Price = request.Price ?? clothing.Price;


                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}