using System.Linq;

namespace Models
{
    public class BoatLoad : BoatTask
    {
        public void StartTask(Boat t)
        {
            t.SwitchLoadable();
        }

        public bool TaskComplete(Boat t)
        {
            if(t.chests.Any() && t.loadable){
                t.SwitchLoadable();
            }

            //De boat gaat weg als er 3 rekjes in de boat zitten
            return t.chests.Count == 3;
        }
    }
}