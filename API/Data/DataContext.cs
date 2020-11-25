using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    // Use Command + . on the DataContext to get a 
    // list of actions that can be done - this is how I created
    // the constructor.
    //
    // There was some sort of [NullParameter] attribute
    // that appeared before DbContextOptions that Neil
    // removed without comment. Not sure why, but I do
    // know that the file wasn't going to build without
    // some other namespace being added. :)
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<AppUser> Users { get; set; }

    }
}