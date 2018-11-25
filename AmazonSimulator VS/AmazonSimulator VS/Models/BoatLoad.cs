using System.Linq;

namespace Models
{
    public class BoatLoad : BoatTask
    {
        /// <summary>
        /// Method to start loading the boat by setting the switchloadable to true
        /// </summary>
        /// <param name="t"></param>
        public void StartTask(Boat t)
        {
            t.SwitchLoadable();
        }

        /// <summary>
        /// Method to stop loading and make the boat leave if it has 3 barrels
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool TaskComplete(Boat t)
        {
            if(t.barrels.Any() && t.loadable){
                t.SwitchLoadable();
            }

            return t.barrels.Count == 3;
        }
    }
}