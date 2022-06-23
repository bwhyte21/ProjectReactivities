namespace ProjectReactivities_Application.Core;

/// <summary>
/// A generic Result object to be used by all entities.
/// </summary>
/// <typeparam name="T"></typeparam>
public class ApiResult<T>
{
    public bool IsSuccess { get; set; }
    public T Value { get; set; }
    public string Error { get; set; }

    /// <summary>
    /// If activity value found.
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static ApiResult<T> Success(T value) => new() { IsSuccess = true, Value = value };

    /// <summary>
    /// If activity value not found.
    /// </summary>
    /// <param name="error"></param>
    /// <returns></returns>
    public static ApiResult<T> Failure(string error) => new() { IsSuccess = false, Error = error };
}