namespace API.Entities
{
    public class AppUser
    {
        // EF note: Use Id for the PK, don't name it differently
        public int Id { get; set; }

        // EF note: Use this as written, with case!
        public string UserName { get; set; }
    }
}