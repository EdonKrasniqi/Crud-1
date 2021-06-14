using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Libraries
{
    public class LibrariesEdit
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
                        var library = await _context.Library.FindAsync(request.Id);

                        if(library == null)
                            throw new Exception ("Could not find activity");

                        library.Title = request.Title ?? library.Title;
                        library.Description = request.Description ?? library.Description;
                        library.Category = request.Category ?? library.Category;
                        library.Date = request.Date ?? library.Date;
                        library.Price = request.Price ?? library.Price;


                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}