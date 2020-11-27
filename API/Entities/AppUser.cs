namespace API.Entities
{
    public class AppUser
    {
        // EF note: Use Id for the PK, don't name it differently
        public int Id { get; set; }

        // EF note: Use this as written, with case!
        public string UserName { get; set; }
        
        // Lesson 33:
        // we're doing passwords in a way that isn't
        // secure enough for modern use, but will
        // help us understand how things work.
        // Later we'll upgrade this.
        //
        // we run 
        // dotnet ef migrations add UserPasswordAdded
        // in the terminal to pick up these new fields in 
        // the ORM.
        // 
        // Then:
        // dotnet ef database update
        // also in the terminal
        public byte[] PasswordHash{get;set;}
        public byte[] PasswordSalt{get;set;}
    }
}