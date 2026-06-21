public class Logger{
    private static Logger instance;

    private Logger(){
        
    }

    public static Logger getinstance(){
        if (instance == null){
            instance=new Logger();

        }
        return instance;
    }

    public void log(String msg){
        System.out.println("Log:"+msg);
    }
}