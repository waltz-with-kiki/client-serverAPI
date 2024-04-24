namespace test.Server.Response.Intefaces
{
    public interface IBaseResponse <T>
    {
        string Description { get; }

        StatusCode StatusCode { get; }

        T Data { get; }

    }
}
