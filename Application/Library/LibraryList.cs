using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Libraries
{
    public class LibrariesList
    {
        public class Query : IRequest<List<Library>> { }

        public class Handler : IRequestHandler<Query, List<Library>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Library>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var libraries = await _context.Library.ToListAsync();

                return libraries;
            }
        }
    }
}