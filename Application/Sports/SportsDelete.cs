using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Sports
{
    public class SportsDelete
    {
        public class Command : IRequest
                {
                   public Guid Id { get; set; }
                   
                   
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
                        
                        var sport= await _context.Sports.FindAsync(request.Id);

                        if(sport == null)
                            throw new Exception ("Could not find product");

                            _context.Remove(sport);

                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}