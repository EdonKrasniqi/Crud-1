using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Households
{
    public class HouseholdsEdit
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
                        var household = await _context.Households.FindAsync(request.Id);

                        if(household == null)
                            throw new Exception ("Could not find activity");

                        household.Title = request.Title ?? household.Title;
                        household.Description = request.Description ?? household.Description;
                        household.Category = request.Category ?? household.Category;
                        household.Date = request.Date ?? household.Date;
                        household.Price = request.Price ?? household.Price;


                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}