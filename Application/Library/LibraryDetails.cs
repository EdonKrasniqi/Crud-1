using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Libraries
{
    public class LibrariesDetails
    {
        public class Query : IRequest<Library>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Library>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Library> Handle(Query request, CancellationToken cancellationToken)
            {
                var library = await _context.Library.FindAsync(request.Id);

                return library;
            }
        }
    }
}